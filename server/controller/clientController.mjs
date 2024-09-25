import Client from "../models/client.mjs";

// create a client

export const createClient = async (request, response) => {
  try {
    const { name, email, address, phoneNumberOne, phoneNumberTwo } =
      request.body;

    // Add 'await' here to properly check if the client exists
    const isClient = await Client.findOne({ email: email.toLowerCase() });

    if (isClient) {
      return response.status(400).send("Client already exists");
    }

    // Capitalize 'Client' when creating a new instance
    const client = new Client({
      name: name,
      email: email,
      address: address,
      phoneNumberOne: phoneNumberOne,
      phoneNumberTwo: phoneNumberTwo,
    });

    // Save the client and await it
    await client.save();

    response
      .status(201)
      .json({ message: "Client created successfully", client });
  } catch (error) {
    console.log(`Error while creating the client: ${error}`);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return response.status(400).send(messages.join(" "));
    }
    // Default error message for other errors
    return response.status(400).send("An error occurred during registration.");
  }
};

// Get all clients or a single client by ID
export const getClients = async (request, response) => {
  try {
    const { id } = request.params;
    const clients = id ? await Client.findById(id) : await Client.find({});

    if (!clients) {
      return response.status(404).json({ message: "Client not found" });
    }

    response.status(200).json(clients);
  } catch (error) {
    console.log(`Error while retrieving the clients: ${error}`);
    return response
      .status(500)
      .send("An error occurred while retrieving clients.");
  }
};

// Update a client by ID

export const updateClient = async (request, response) => {
  try {
    const { id } = request.params;
    const { name, email, address, phoneNumberOne, phoneNumberTwo } =
      request.body;

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      {
        name,
        email,
        address,
        phoneNumberOne,
        phoneNumberTwo,
      },
      { new: true, runValidators: true } // 'new: true' returns the updated client, 'runValidators' ensures validation
    );
    if (!updatedClient) {
      return response.status(404).json({ message: "Client not found" });
    }

    response
      .status(200)
      .json({ message: "Client updated successfully", updatedClient });
  } catch (error) {
    console.log(`Error while updating the client: ${error}`);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return response.status(400).send(messages.join(" "));
    }
    return response
      .status(500)
      .send("An error occurred while updating the client.");
  }
};

// Delete a client by ID
export const deleteClient = async (request, response) => {
  try {
    const { id } = request.params;

    // Find and delete the client by ID
    const deletedClient = await Client.findByIdAndDelete(id);

    if (!deletedClient) {
      return response.status(404).json({ message: "Client not found" });
    }

    response.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    console.log(`Error while deleting the client: ${error}`);
    return response
      .status(500)
      .send("An error occurred while deleting the client.");
  }
};
