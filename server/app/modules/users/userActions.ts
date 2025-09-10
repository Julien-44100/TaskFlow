import type { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import userRepository from "./userRepository";

const browse: RequestHandler = async (_req, res, next) => {
  try {
    const users = await userRepository.readAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const user = await userRepository.read(id);
    if (!user) return res.sendStatus(404);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { email, password, display_name } = req.body as {
      email: string;
      password: string;
      display_name?: string | null;
    };

    if (!email || !password) return res.status(400).json({ error: "INVALID_PAYLOAD" });

    const passwordHash = await bcrypt.hash(password, 12);
    const id = await userRepository.create(email, passwordHash, display_name ?? null);

    res.status(201).json({ id });
  } catch (err: any) {
    if (err?.code === "ER_DUP_ENTRY") return res.status(409).json({ error: "EMAIL_EXISTS" });
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { display_name, avatar_url } = req.body as {
      display_name?: string | null;
      avatar_url?: string | null;
    };
    await userRepository.update(id, display_name ?? null, avatar_url ?? null);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await userRepository.delete(id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy };
