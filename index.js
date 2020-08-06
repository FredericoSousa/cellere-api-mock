const user_ip = "127.0.0.1";

const app = require("express")();
const bodyParser = require("body-parser");
const upload = require("multer")();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.single("arq_json"));

const error = (message) => ({
  erro: message,
  response_error: 400,
  user_ip,
});

const parse = (file) => {
  try {
    return JSON.parse(file.buffer.toString());
  } catch (error) {
    return { error: error.message };
  }
};

app.get("/get_token", (req, res) => {
  return res.json({
    response: 200,
    token: "c0bd6020459b9e06",
    user_ip,
  });
});

app.post("/map3c", (req, res) => {
  const { token } = req.body;
  const { file } = req;
  if (!token)
    return res.status(400).send(error("token vazio,favor informar token"));
  if (token.length < 16) return res.status(400).send(error("token inválido"));
  const data = parse(file);
  if (data.error)
    return res.status(400).send(error("Falha ao validar um ou mais campos"));
  return res.json({
    response: 200,
    status: "Sucesso",
    token,
    user_ip,
  });
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server listen on port ${PORT}`));
