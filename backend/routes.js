// routes.js - Handles routing logic for our custom Node.js server.

const mongoose = require('mongoose');

const User = require('./models/User');
const Admin = require('./models/Admin');
const BloodRequest = require('./models/BloodRequest');
const BloodStock = require('./models/BloodStock');
const DonationHistory = require('./models/DonationHistory');

// Helper to read JSON body
function getBody(req, callback) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    try {
      callback(body ? JSON.parse(body) : {});
    } catch (e) {
      console.error('Error parsing JSON body:', e);
      callback({});
    }
  });
}

async function handleApiRequest(req, res) {
  const { url, method } = req;
  const requestUrl = new URL(url, `http://${req.headers.host}`);
  const { pathname, searchParams } = requestUrl;
  const pathParts = pathname.split('/').filter((p) => p);

  res.setHeader('Content-Type', 'application/json');

  try {
    // -------- USER ROUTES --------
    if (method === 'POST' && pathname === '/api/signup') {
      getBody(req, async (body) => {
        const newUser = new User(body);
        await newUser.save();
        res
          .writeHead(201)
          .end(JSON.stringify({ message: 'User registered successfully!' }));
      });
    } else if (method === 'POST' && pathname === '/api/login') {
      getBody(req, async ({ email, password }) => {
        const user = await User.findOne({ email, password });
        if (user) {
          res.writeHead(200).end(
            JSON.stringify({
              message: 'Login successful',
              userId: user._id,
              name: user.name,
            })
          );
        } else {
          res.writeHead(401).end(JSON.stringify({ message: 'Invalid credentials' }));
        }
      });
    } else if (method === 'GET' && pathname === '/api/search') {
      const blood_group = searchParams.get('blood_group');
      const address = searchParams.get('address');
      const query = {};
      if (blood_group) query.blood_group = blood_group;
      if (address) query.address = { $regex: address, $options: 'i' };
      const donors = await User.find(query);
      res.writeHead(200).end(JSON.stringify(donors));
    } else if (method === 'POST' && pathname === '/api/request-blood') {
      getBody(req, async (body) => {
        const newRequest = new BloodRequest({
          ...body,
          created_at: new Date(), // ensure dashboard has a date to sort
        });
        await newRequest.save();
        res.writeHead(201).end(JSON.stringify({ message: 'Request submitted!' }));
      });
    } else if (method === 'GET' && pathParts[0] === 'api' && pathParts[1] === 'profile') {
      const userId = pathParts[2];
      const user = await User.findById(userId);
      const history = await DonationHistory.find({
        user_id: new mongoose.Types.ObjectId(userId),
      }).sort({ donation_date: -1 });
      res.writeHead(200).end(JSON.stringify({ user, history }));
    }

    // -------- ADMIN ROUTES --------
    else if (method === 'POST' && pathname === '/api/admin/login') {
      getBody(req, async ({ username, password }) => {
        const admin = await Admin.findOne({ username, password });
        if (admin) {
          res.writeHead(200).end(JSON.stringify({ message: 'Admin login successful' }));
        } else {
          res.writeHead(401).end(JSON.stringify({ message: 'Invalid admin credentials' }));
        }
      });
    }

    // -------- DASHBOARD STATS --------
    else if (method === 'GET' && pathname === '/api/admin/dashboard') {
      const donors = await User.countDocuments({});
      const pending = await BloodRequest.countDocuments({ status: 'pending' });
      const approved = await BloodRequest.countDocuments({ status: 'approved' });

      // make sure every blood group exists in stock collection
      const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
      for (const group of bloodGroups) {
        await BloodStock.findOneAndUpdate(
          { blood_group: group },
          {},
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      }

      // total units = sum of units of all blood groups
      const stockAgg = await BloodStock.aggregate([
        { $group: { _id: null, total: { $sum: '$units' } } },
      ]);
      const totalUnits = stockAgg.length ? stockAgg[0].total : 0;

      // latest 5 requests for dashboard table
      const recentRequests = await BloodRequest.find({})
        .sort({ created_at: -1 })
        .limit(5);

      res.writeHead(200).end(
        JSON.stringify({
          donors,
          pending,
          approved,
          totalUnits,
          recentRequests,
        })
      );
    }

    // -------- DONORS --------
    else if (method === 'GET' && pathname === '/api/admin/donors') {
      const donors = await User.find({});
      res.writeHead(200).end(JSON.stringify(donors));
    } else if (method === 'POST' && pathname === '/api/admin/donors') {
      // Add donor from admin (same-style fields as signup)
      getBody(req, async (body) => {
        const {
          name,
          email,
          password,
          age,
          blood_group,
          mobile,
          gender,
          address,          // optional if ever sent
          address_line,
          city,
          state,
          pincode,
          google_maps_link,
        } = body;

        // ✅ Build value for required `address` field in schema
        let fullAddress =
          address ||
          address_line ||
          [city, state].filter(Boolean).join(', ');

        if (!fullAddress) {
          fullAddress = 'Not provided';
        }

        const newUser = new User({
          name,
          email,
          password: password || 'donor123', // default if admin doesn't type anything
          age,
          blood_group,
          gender,
          mobile,
          address: fullAddress,             // ✅ required field
          address_line,
          city,
          state,
          pincode,
          google_maps_link,
        });

        await newUser.save();
        res.writeHead(201).end(JSON.stringify({ message: 'Donor added' }));
      });
    } else if (
      method === 'DELETE' &&
      pathParts[0] === 'api' &&
      pathParts[1] === 'admin' &&
      pathParts[2] === 'donors'
    ) {
      const donorId = pathParts[3];
      await User.findByIdAndDelete(donorId);
      res.writeHead(200).end(JSON.stringify({ message: 'Donor deleted' }));
    }

    // -------- REQUESTS --------
    else if (method === 'GET' && pathname === '/api/admin/requests') {
      const requests = await BloodRequest.find({});
      res.writeHead(200).end(JSON.stringify(requests));
    } else if (
      method === 'PUT' &&
      pathParts[0] === 'api' &&
      pathParts[1] === 'admin' &&
      pathParts[2] === 'requests'
    ) {
      getBody(req, async ({ status }) => {
        const requestId = pathParts[3];
        await BloodRequest.findByIdAndUpdate(requestId, { status });
        res.writeHead(200).end(JSON.stringify({ message: 'Status updated' }));
      });
    }

    // -------- STOCK --------
    else if (method === 'GET' && pathname === '/api/admin/stock') {
      const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
      for (const group of bloodGroups) {
        await BloodStock.findOneAndUpdate(
          { blood_group: group },
          {},
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      }
      const stock = await BloodStock.find({}).sort({ blood_group: 1 });
      res.writeHead(200).end(JSON.stringify(stock));
    } else if (method === 'POST' && pathname === '/api/admin/stock') {
      getBody(req, async (stockUpdates) => {
        for (const item of stockUpdates) {
          await BloodStock.findOneAndUpdate(
            { blood_group: item.blood_group },
            { units: item.units }
          );
        }
        res.writeHead(200).end(JSON.stringify({ message: 'Stock updated' }));
      });
    }

    // -------- DONATIONS --------
    else if (method === 'GET' && pathname === '/api/admin/donations') {
      // join donations with users
      const donations = await DonationHistory.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user',
          },
        },
        { $unwind: '$user' },
        { $sort: { donation_date: -1 } },
      ]);
      res.writeHead(200).end(JSON.stringify(donations));
    } else if (method === 'POST' && pathname === '/api/admin/donations') {
      getBody(req, async ({ donorId, venue, donation_date, units }) => {
        const donor = await User.findById(donorId);
        if (!donor) {
          res.writeHead(400).end(JSON.stringify({ message: 'Donor not found' }));
          return;
        }

        const donation = new DonationHistory({
          user_id: donor._id,
          blood_group: donor.blood_group,
          venue,
          donation_date: donation_date ? new Date(donation_date) : new Date(),
          units: units || 1,
        });
        await donation.save();

        // increase stock for that blood group
        await BloodStock.findOneAndUpdate(
          { blood_group: donor.blood_group },
          { $inc: { units: units || 1 } },
          { upsert: true }
        );

        res.writeHead(201).end(JSON.stringify({ message: 'Donation logged' }));
      });
    } else if (
      method === 'DELETE' &&
      pathParts[0] === 'api' &&
      pathParts[1] === 'admin' &&
      pathParts[2] === 'donations'
    ) {
      const donationId = pathParts[3];
      const donation = await DonationHistory.findById(donationId);
      if (donation) {
        await BloodStock.findOneAndUpdate(
          { blood_group: donation.blood_group },
          { $inc: { units: -donation.units } }
        );
        await DonationHistory.findByIdAndDelete(donationId);
      }
      res.writeHead(200).end(JSON.stringify({ message: 'Donation deleted' }));
    }

    // -------- FALLBACK --------
    else {
      res.writeHead(404).end(JSON.stringify({ message: 'Route not found' }));
    }
  } catch (error) {
    console.error('Server Error:', error);
    res
      .writeHead(500)
      .end(JSON.stringify({ message: 'An internal server error occurred.' }));
  }
}

module.exports = { handleApiRequest };
