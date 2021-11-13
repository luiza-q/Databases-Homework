select * from bookings

SELECT c.name as customerName, b.checkin_date, b.nights, h.name as hotelName 
    FROM bookings b 
    inner join customers c on c.id=b.customer_id 
    inner join hotels h on h.id=b.hotel_id 
    where c.id=1;
