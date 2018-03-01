delete from roster
where player_id = $1;
select * from roster 
where teams_id = $2;