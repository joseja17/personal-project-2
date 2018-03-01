delete from schedule
where schedule_id = $1;
select * from schedule 
where teams_id = $2;