select * from roster 
join teams on roster.teams_id = teams.teams_id
where player_id =$1;