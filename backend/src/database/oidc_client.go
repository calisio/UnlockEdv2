package database

import "UnlockEdv2/src/models"

func (db *DB) GetClientForProvider(provID uint) (*models.OidcClient, error) {
	client := models.OidcClient{}
	err := db.Conn.Where("provider_platform_id = ?", provID).First(&client).Error
	return &client, err
}

func (db *DB) GetAllRegisteredClients() ([]models.OidcClient, error) {
	var clients []models.OidcClient
	err := db.Conn.Find(&clients).Error
	return clients, err
}

func (db *DB) RegisterClient(client *models.OidcClient) error {
	return db.Conn.Create(client).Error
}
