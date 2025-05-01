const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const path = require('path');

router.post('/run-c', (req, res) => {
  const code = req.body.code;

  const command = `python3 backend/compiler/c_runner.py "${code.replace(/"/g, '\\"')}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) return res.status(500).send({ error: stderr || error.message });
    return res.send({ output: stdout });
  });
});

module.exports = router;
