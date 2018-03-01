delete from teams
where teams_id = $1;
select * from teams 
where coaches_id = $2;