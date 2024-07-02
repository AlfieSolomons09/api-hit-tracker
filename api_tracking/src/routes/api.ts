import { Router } from 'express';
import { logApiHit, getApiHits, getRequestCountByOS, getRequestCountByCriteria } from '../services/ApiHitService';

const router = Router();

router.use(async (req, res, next) => {
  try {
    await logApiHit({
      timestamp: new Date(),
      requestType: req.method,
      endpoint: req.originalUrl,
      userAgent: req.headers['user-agent'] || '',
      requestBody: JSON.stringify(req.body) || null,
      operatingSystem: req.headers['user-agent'] || '',
      ipAddress: `${req.ip}`,
    });
  } catch (error) {
    console.error('Error logging API hit:', error);
  }
  next();
});

router.get('/', (req, res) => {
  res.send('API is running');
});

router.get('/api-hits', async (req, res) => {
  try {
    const hits = await getApiHits();
    res.json(hits);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.get('/os-stats', async (req, res) => {
  try {
    const osStats = await getRequestCountByOS();
    res.json(osStats);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.get('/api/stats/:criteria', async (req, res) => {
  const { criteria } = req.params;
  try {
    const stats = await getRequestCountByCriteria(criteria);
    res.json(stats);
  } catch (error) {
    console.error(`Error fetching stats by ${criteria}:`, error);
    res.status(500).send('Server error');
  }
});


export default router;
