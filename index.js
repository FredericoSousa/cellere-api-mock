const user_ip = "127.0.0.1";
const express = require('express')
const app = express();

app.use(express.json());
app.use(upload.single("arq_json"));

const error = (message) => ({
  erro: message,
  response_error: 400,
  user_ip,
});

app.post("/map3c", (req, res) => {
  const { token, ...pipe } = req.body;
  const { PG_Id_Pipe,PG_TAB_Id_Pipe_Produtos } = req.body;
  console.log(pipe)
  if (!token)
    return res.status(400).send(error("Token vazio"));
  if (token.length < 16) 
    return res.status(400).send(error("Token inválido"));
  if (!PG_Id_Pipe)
    return res.status(400).send(error("Campo PG_Id_Pipe obrigatório não encontrado"));
  if (!PG_TAB_Id_Pipe_Produtos)
    return res.status(400).send(error("Campo PG_TAB_Id_Pipe_Produtos obrigatório não encontrado"));
  return res.json({
    response: 200,
    status: "Sucesso",
    token,
    user_ip,
  });
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server listen on port ${PORT}`));
