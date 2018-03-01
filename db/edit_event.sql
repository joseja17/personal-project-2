update schedule set event_name = $1, event_date = $2, event_time = $3, event_location = $4, teams_id = $5
where schedule_id = $6;