package database

import (
	"UnlockEdv2/src/models"
)

func (db *DB) GetProgramByID(id int) (*models.Program, error) {
	content := &models.Program{}
	if err := db.Conn.First(content, id).Error; err != nil {
		return nil, err
	}
	return content, nil
}

func (db *DB) GetProgram(page, perPage int, search string) (int64, []models.Program, error) {
	content := []models.Program{}
	total := int64(0)
	if search != "" {
		// search by program name, alt name or provider platform name (provider_platforms.id = programs.provider_platform_id)
		search = "%" + search + "%"
		_ = db.Conn.Model(&models.Program{}).Where("programs.name ILIKE ?", search).Or("programs.alt_name ILIKE ?", search).
			Or("provider_platforms.name ILIKE ?", search).Joins("LEFT JOIN provider_platforms ON programs.provider_platform_id = provider_platforms.id").Count(&total)
	} else {
		_ = db.Conn.Model(&models.Program{}).Count(&total)
	}
	if err := db.Conn.Limit(perPage).Offset((page - 1) * perPage).Find(&content).Error; err != nil {
		return 0, nil, err
	}
	return total, content, nil
}

func (db *DB) CreateProgram(content *models.Program) (*models.Program, error) {
	if err := db.Conn.Create(content).Error; err != nil {
		return nil, err
	}
	return content, nil
}

func (db *DB) UpdateProgram(content *models.Program) (*models.Program, error) {
	if err := db.Conn.Save(content).Error; err != nil {
		return nil, err
	}
	return content, nil
}

func (db *DB) DeleteProgram(id int) error {
	if err := db.Conn.Delete(models.Program{}).Where("id = ?", id).Error; err != nil {
		return err
	}
	return nil
}

func (db *DB) GetProgramByProviderPlatformID(id int) ([]models.Program, error) {
	content := []models.Program{}
	if err := db.Conn.Where("provider_platform_id = ?", id).Find(&content).Error; err != nil {
		return nil, err
	}
	return content, nil
}
