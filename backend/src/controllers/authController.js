import { supabase } from "../config/supabaseClient.js";

const authController = {
  userLogin: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Please provide email and password",
      });
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (error || !user) {
      throw new Error("Invalid credentials");
    }

    return user;
  },
  userSignup:async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        error: "Please provide email and password",
      });
    }
    const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .maybeSingle();

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = uuidv4();

  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        id: userId,
        email,
        password: hashedPassword,
        name,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;

  },
};
export default authController;
