const express = require('express');
const router = express.Router();
const supabase = require('../services/supabase');
const crypto = require('crypto');

// Criar compromisso
router.post('/', async (req, res) => {
  const { titulo, descricao, data, hora } = req.body;

  const { data: newCompromisso, error } = await supabase
    .from('compromissos')
    .insert([{
      id: crypto.randomUUID(),
      titulo,
      descricao,
      data,
      hora
    }]);

    if (error) {
      console.log("ERRO AO INSERIR:", error);
      return res.status(500).json({ error: error.message });
    }
    
  res.json(newCompromisso);
});

// Listar compromissos
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('compromissos')
    .select('*')
    .order('data', { ascending: true });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;
