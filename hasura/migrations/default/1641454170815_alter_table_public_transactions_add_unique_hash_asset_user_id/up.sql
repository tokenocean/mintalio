delete from transactions t1 using (
select hash, asset, user_id, type, min(ctid) as ctid, count(*) as c
from transactions t1 
group by hash, asset, user_id, type
having count(*) > 1
) t2 where t1.hash = t2.hash and t1.asset = t2.asset and t1.user_id = t2.user_id and t1.type = t2.type and t1.ctid != t2.ctid;

alter table "public"."transactions" add constraint "transactions_hash_asset_user_id_key" unique ("hash", "asset", "user_id", "type");
