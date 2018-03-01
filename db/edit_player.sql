update roster set jersey_number = $1, photo = $2, first_name = $3, last_name = $4, phone_number = $5, email = $6, date_of_birth = $7, teams_id = $8
where player_id = $9;