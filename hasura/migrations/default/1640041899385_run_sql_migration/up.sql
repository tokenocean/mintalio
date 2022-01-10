CREATE OR REPLACE FUNCTION public.trigger_update_bid()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE bid INTEGER;
BEGIN
    IF NEW.type = 'bid' THEN
        SELECT transactions.amount
        FROM transactions
        JOIN artworks ON transactions.artwork_id = artworks.id
        WHERE transactions.artwork_id = NEW.artwork_id
        AND transactions.type = 'bid'
        AND transactions.id != NEW.id
        AND (transactions.created_at > artworks.transferred_at
        OR artworks.transferred_at IS NULL)
        ORDER BY amount DESC
        LIMIT 1
        INTO bid;
        
      IF bid IS NULL OR NEW.amount > bid THEN
        UPDATE artworks SET bid_id = NEW.id WHERE id = NEW.artwork_id;
      END IF;
    END IF;

  RETURN NEW;
END;
$function$;
