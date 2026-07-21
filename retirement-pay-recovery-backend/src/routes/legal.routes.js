'use strict';

const { Router } = require('express');
const { searchStatutes, searchPrecedents } = require('../services/lawApi.service');

const router = Router();

// GET /api/legal/statutes?keyword=퇴직금
router.get('/statutes', async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    res.status(400).json({ error: 'keyword is required' });
    return;
  }

  try {
    const results = await searchStatutes(keyword);
    res.json(results);
  } catch (err) {
    console.error('[legal.routes] /statutes 오류:', err.message);
    res.status(500).json({ error: 'law api unavailable' });
  }
});

// GET /api/legal/precedents?keyword=퇴직금+체불
router.get('/precedents', async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    res.status(400).json({ error: 'keyword is required' });
    return;
  }

  try {
    const results = await searchPrecedents(keyword);
    res.json(results);
  } catch (err) {
    console.error('[legal.routes] /precedents 오류:', err.message);
    res.status(500).json({ error: 'law api unavailable' });
  }
});

module.exports = router;
