select * from roster
join teams on roster.teams_id = teams.teams_id
WHERE  teams.teams_id = $1;