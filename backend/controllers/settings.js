//import functions from Settings model
import {
  getSettings,
  getSettingByKey,
  updateSetting,
  updateMultipleSettings,
  getSettingsObject,
} from "../Models/SettingsModels.js";

//import email config reload function
import { reloadEmailConfig } from "../Config/emailConfig.js";

//get all settings
export const showSettings = (req, res) => {
  getSettings((err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

//get settings as object
export const showSettingsObject = (req, res) => {
  getSettingsObject((err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

//get single setting
export const showSettingByKey = (req, res) => {
  getSettingByKey(req.params.key, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

//update single setting
export const updateSettingByKey = (req, res) => {
  const key = req.params.key;
  const value = req.body.value;
  
  updateSetting(key, value, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ message: "Setting updated successfully" });
    }
  });
};

//update multiple settings
export const updateSettings = async (req, res) => {
  const settings = req.body.settings; // Array of {key, value} objects
  
  if (!Array.isArray(settings)) {
    return res.status(400).json({ error: "Settings must be an array" });
  }
  
  updateMultipleSettings(settings, async (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // Reload email configuration after updating settings
      await reloadEmailConfig();
      res.json({ ...results, message: "Settings updated and email config reloaded" });
    }
  });
};

