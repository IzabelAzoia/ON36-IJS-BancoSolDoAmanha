import { Request, Response } from 'express';
import { ClientService } from 'src/domain/clients/services/client.service';

class ClientController {
  private clientService: ClientService;

  constructor(clientService: ClientService) {
    this.clientService = clientService;
  }

  public async createClient(req: Request, res: Response): Promise<Response> {
    try {
      const clientData = req.body;
      const newClient = await this.clientService.createClient(clientData);
      return res.status(201).json(newClient);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  public async getAllClients(req: Request, res: Response): Promise<Response> {
    try {
      const clients = await this.clientService.getAllClients();
      return res.status(200).json(clients);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  public async getClientById(req: Request, res: Response): Promise<Response> {
    try {
      const clientId = req.params.id;
      const client = await this.clientService.findById(clientId);
      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }
      return res.status(200).json(client);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  public async updateClient(req: Request, res: Response): Promise<Response> {
    try {
      const clientId = req.params.id;
      const clientData = req.body;
      const updatedClient = await this.clientService.updateClient(clientId, clientData);
      if (!updatedClient) {
        return res.status(404).json({ message: 'Client not found' });
      }
      return res.status(200).json(updatedClient);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  public async deleteClient(req: Request, res: Response): Promise<Response> {
    try {
      const clientId = req.params.id;
      const result = await this.clientService.removeClient(clientId);
      if (!result) {
        return res.status(404).json({ message: 'Client not found' });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default ClientController;
