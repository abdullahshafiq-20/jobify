import { Job } from '../models/Job.js';

export const createJob = async (req, res) => {
  try {
    const { title, description, company, location, salary, requirements } = req.body;
    const job = new Job({ title, description, company, location, salary, requirements });
    await job.save();
    res.status(201).json({ message: 'Job created successfully', job });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create job' });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { title, description, company, location, salary, requirements } = req.body;
    const job = await Job.findByIdAndUpdate(req.params.id, { title, description, company, location, salary, requirements }, { new: true });
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ message: 'Job updated successfully', job });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update job' });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete job' });
  }
};

export const getJobs = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search, 
      company, 
      location, 
      minSalary, 
      maxSalary, 
      sortBy = 'createdAt', 
      sortOrder = 'desc' 
    } = req.query;

    // Build the query
    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    if (company) query.company = company;
    if (location) query.location = { $regex: location, $options: 'i' };
    if (minSalary || maxSalary) {
      query.salary = {};
      if (minSalary) query.salary.$gte = parseInt(minSalary);
      if (maxSalary) query.salary.$lte = parseInt(maxSalary);
    }

    // Build the sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute the query
    const jobs = await Job.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate('company', 'name location');

    // Get total count for pagination
    const totalJobs = await Job.countDocuments(query);

    res.json({
      jobs,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalJobs / parseInt(limit)),
      totalJobs
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('company', 'name location');
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch job' });
  }
};