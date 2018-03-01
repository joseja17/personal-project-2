select * from schedule 
join teams on schedule.teams_id = teams.teams_id
where schedule_id =$1;