select * from schedule
join teams on schedule.teams_id = teams.teams_id
WHERE  teams.teams_id = $1;