import express from 'express';
import cors from 'cors';
import { MongoClient, ServerApiVersion } from 'mongodb';
import bcryptjs from 'bcryptjs';

const uri =
  'mongodb+srv://sher:sher@cluster0.7k3n9my.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

app.post('/api/registration', async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    if (!name || !phone || !password) {
      return res
        .status(400)
        .json({ message: 'Необходимы имя, телефон и пароль!' });
    }

    await client.connect();

    const hashedPassword = await bcryptjs.hash(password, 10);

    const users = client.db().collection('users');
    const user = await users.findOne({ phone });

    if (!user) {
      await users.insertOne({ name, phone, password: hashedPassword });
      res.json({
        success: true,
        message: 'Успешно зарегистрировано',
        data: { name, phone },
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Пользователь с таким телефоном уже существует',
      });
    }
  } catch (error) {
    console.error('Ошибка', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: 'Необходимы телефон и пароль!' });
    }

    await client.connect();
    const users = client.db().collection('users');
    const user = await users.findOne({ phone });

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден!' });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Неверный пароль' });
    }

    res.json({ message: 'Успешный вход', data: { name: user.name, phone } });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => {
  console.log(`Сервер работает на порту ${PORT}`);
});
