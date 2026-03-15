import { supabase } from "../config/supabaseClient.js";
import { v4 as uuidv4 } from "uuid";

const accountController = {

  getBalance: async (req, res) => {

      const userId = req.user.id;

      const { data, error } = await supabase
        .from("users")
        .select("balance")
        .eq("id", userId)
        .single();

      if (error) throw error;

      return res.json({
        success: true,
        balance: data.balance,
      });

  }

};

export default accountController;