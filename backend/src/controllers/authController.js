import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
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
        return res.status(401).json({
          success: false,
          error: "Invalid credentials",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: "Invalid credentials",
        });
      }

      return res.status(200).json({
        success: true,
        data: user,
      });
    
  },

  userSignup: async (req, res) => {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({
          success: false,
          error: "Please provide name, email and password",
        });
      }


      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: 'User already exists',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = uuidv4();

      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            id: userId,
            name,
            email,
            password: hashedPassword,
            balance: 10000,
          },
        ])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return res.status(201).json({
        success: true,
        message: 'User created successfully',
        data,
      });
    
  },
};

export default authController;