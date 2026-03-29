package com.railway.booking.controller;

import com.railway.booking.entity.Booking;
import com.railway.booking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public Booking bookTicket(@RequestBody Booking booking) {
        return bookingService.reserveTicket(booking);
    }

    @GetMapping("/{pnr}")
    public Booking getBooking(@PathVariable String pnr) {
        return bookingService.getBookingByPnr(pnr);
    }

    @DeleteMapping("/{pnr}")
    public Booking cancel(@PathVariable String pnr) {
        return bookingService.cancelTicket(pnr);
    }
}
