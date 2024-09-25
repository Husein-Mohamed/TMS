import { Router } from "express";
import {
  createClient,
  getClients,
  updateClient,
  deleteClient,
} from "../controller/clientController.mjs";
import { validateClient } from "../middleware/clientValidations.mjs";

const router = Router();

// create a client
router.post("/api/createClient", validateClient, createClient);

// Get all clients or a specific client by ID
router.get("/api/clients/:id?", getClients);

// Update a client by ID
router.put("/api/clients/:id", validateClient, updateClient);

// Delete a client by ID
router.delete("/api/clients/:id", deleteClient);

export default router;
