package com.railway.booking.service;

import com.railway.booking.entity.Booking;
import com.railway.booking.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class BookingService {

    @Autowired
    private BookingRepository repository;

    public Booking reserveTicket(Booking booking) {
        booking.setPnr(generatePNR());
        booking.setStatus("BOOKED");
        return repository.save(booking);
    }

    public Booking cancelTicket(String pnr) {
        Booking booking = repository.findByPnr(pnr).orElseThrow(() -> new RuntimeException("PNR not found"));
        booking.setStatus("CANCELLED");
        return repository.save(booking);
    }

    public Booking getBookingByPnr(String pnr) {
        return repository.findByPnr(pnr).orElseThrow(() -> new RuntimeException("PNR not found"));
    }

    private String generatePNR() {
        Random random = new Random();
        StringBuilder pnr = new StringBuilder();
        for (int i = 0; i < 10; i++) {
            pnr.append(random.nextInt(10));
        }
        return pnr.toString();
    }
}
