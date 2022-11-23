import Jobs from '../models/Jobs.js';
import { StatusCodes } from 'http-status-codes';
import checkPermissions from '../utils/checkPermission.js';
import {
  BadRequestError,
  NotFoundError,
} from '../errors/index.js';
import Job from '../client/src/components/Job.js';
import mongoose from 'mongoose';

const createJob = async (req, res) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError(`Please provide all values`);
  }

  req.body.createdBy = req.user.userId;
  const job = await Jobs.create(req.body);
  res.status(StatusCodes.CREATED).json({
    job,
  });
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;

  const job = await Jobs.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }

  checkPermissions(req.user, job.createdBy);
  await job.remove();
  res.status(StatusCodes.OK).json({ message: 'Success! Job removed' });
};

const updateJob = async (req, res) => {
  const { id: userId } = req.params;
  const { company, position } = req.body;

  if (!company || !position) {
    throw new BadRequestError(`Please provide all values`);
  }

  const job = await Jobs.findOne({ _id: userId });

  if (!job) {
    throw new NotFoundError(`No Job with id : ${userId}`);
  }

  checkPermissions(req.user, job.createdBy);

  const updatedJob = await Jobs.findOneAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({
    updatedJob,
  });
};

const getAllJobs = async (req, res) => {
  const jobs = await Jobs.find({ createdBy: req.user.userId }).select(
    '-__v -createdBy -createdAt -updatedAt'
  );
  res.status(StatusCodes.OK).json({
    jobs,
    totalJobs: jobs.length,
    numOfPages: 1,
  });
};
const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };
  let monthlyApplications = [];

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export { getAllJobs, showStats, deleteJob, updateJob, createJob };
