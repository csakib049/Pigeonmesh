"use client";

import { useState, useEffect } from "react";


// 3 main numbers
const default_numbers = [
    { service: "Police", number: "999" },
    { service: "Ambulance", number: "999" },
    { service: "Fire Brigade", number: "999" },
];

export default function EmergencyContacts() {

    const [isOpen, setIsOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const [service, setService] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");


    type Contact = {
        service: string;
        number: string;
    };

    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("emergencyContacts");

        if (saved) {
            setContacts(JSON.parse(saved))
        }
    }, []);



    const addContact = () => {
        if (!service.trim() || !phoneNumber.trim()) {
            return;
        }

        const newContact = {
            service: service.trim(),
            number: phoneNumber.trim(),
        };

        const updatedContacts = [...contacts, newContact];

        setContacts(updatedContacts);

        localStorage.setItem("emergencyContacts", JSON.stringify(updatedContacts));

        setService("");
        setPhoneNumber("");
        setIsAdding(false);

    };




    return (
        <div className="relative shrink-0">

            <button onClick={() => setIsOpen(!isOpen)} className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-medium text-red-300">🚨 Emergency</button>


            {isOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-slate-800 bg-slate-950 p-3 shadow-xl">
                    <h3 className="mb-3 text-sm font-semibold text-slate-200">
                        🚨 Emergency Contacts
                    </h3>

                    {default_numbers.map((contact) => (
                        <div key={contact.service} className="flex items-center justify-between border-b border-slate-800 py-2 last:border-0">
                            <span className="text-xs text-slate-300">{contact.service}</span>
                            <a href={`tel:${contact.number}`} className="text-xs font-medium text-amber-400"
                            > 📞 {contact.number}</a>
                        </div>
                    ))}


                    <button
                        onClick={() => setIsAdding(true)}
                        className="mt-3 w-full rounded-lg bg-amber-500/10 px-3 py-2 text-xs font-medium text-amber-300 hover:bg-amber-500/20"
                    >
                        + Add Contact
                    </button>

                    {isAdding && (
                        <div className="mt-3 border-t border-slate-800 pt-3">
                            <input type="text" placeholder="Service" value={service} onChange={(e) => setService(e.target.value)} className="mb-2 w-full rounded-lg bg-slate-900 px-3 py-2 text-xs text-slate-200 outline-none" />

                            <input type="tel" placeholder="Phone Number"
                                value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="mb-2 w-full rounded-lg bg-slate-900 px-3 py-2 text-xs text-slate-200 outline-none"
                            />

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsAdding(false)}
                                    className="flex-1 rounded-lg bg-slate-800 px-3 py-2 text-xs text-slate-400"
                                >
                                    Cancel
                                </button>

                                <button className="flex-1 rounded-lg bg-amber-500/20 px-3 py-2 text-xs text-amber-300"> Add Contact </button>
                            </div>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
}



