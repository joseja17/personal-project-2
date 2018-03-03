select * from schedule
join teams on teams.teams_id = schedule.teams_id
join roster on roster.teams_id = schedule.teams_id;