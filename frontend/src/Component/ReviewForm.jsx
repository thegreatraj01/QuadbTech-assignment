import React from 'react';

const BookTicketForm = ({ closeModal,moviename }) => {
    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4"> Book a ticket for : {moviename?.show.name}</h2>
            <form className="ticket-form space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Enter your name"
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="Enter your email"
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>

                <div>
                    <label htmlFor="numberOfTickets" className="block text-sm font-medium text-gray-700">Number of Tickets:</label>
                    <input
                        type="number"
                        id="numberOfTickets"
                        name="numberOfTickets"
                        min="1"
                        required
                        placeholder="Enter the number of tickets"
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>

                <button type="submit" className="bg-green-500 p-3 text-white rounded-md">
                    Book Ticket
                </button>
            </form>

            {/* Close button */}
            <button className="bg-red-500 p-3 mt-4 text-white rounded-md" onClick={() => closeModal()}>
                Cancel 
            </button>
        </div>
    );
};

export default BookTicketForm;
