import React, { useState } from 'react';
import { saveContact, saveActivity } from '../../utils/cmsDb';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    subject: 'GENERAL_INQUIRY',
    name: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert("Please fill in all required message details.");
      return;
    }

    setSubmitting(true);
    const newContact = {
      id: "msg-" + Math.floor(10000 + Math.random() * 90000),
      subject: formData.subject,
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
      status: "Unread",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    };

    saveContact(newContact)
      .then(() => {
        saveActivity(`New client message received from: ${newContact.name} (${newContact.email})`, "contact");
        alert("Your message has been safely transmitted to our operations team. Code: " + newContact.id);
        setFormData({
          subject: 'GENERAL_INQUIRY',
          name: '',
          email: '',
          message: ''
        });
      })
      .catch((err) => {
        console.error("Message transmission failed:", err);
        alert("Transmission failed. Please check network connection.");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="contact-subject">OPERATIONAL INQUIRY TYPE</label>
        <select
          id="contact-subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          className="form-select"
        >
          <option value="GENERAL_INQUIRY">GENERAL INQUIRY / DISPATCH</option>
          <option value="PROJECT_QUOTATION">COMMERCIAL & INDUSTRIAL QUOTATION</option>
          <option value="DEALER_PARTNERSHIP">AUTHORIZED DEALER PARTNERSHIP</option>
          <option value="TECHNICAL_SUPPORT">SYSTEM TECH SUPPORT & WARRANTY</option>
        </select>
      </div>

      <div className="form-grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="contact-name">FULL NAME / ENTITY *</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            placeholder="e.g. Rozil Thapa"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="contact-email">EMAIL ADDRESS *</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder="e.g. info@nightvision.com.np"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="contact-message">TRANSMISSION MESSAGE *</label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          placeholder="State your security requirements, location, camera specs, or inquiry detail..."
          value={formData.message}
          onChange={handleInputChange}
          required
          className="form-textarea"
        />
      </div>

      <button type="submit" disabled={submitting} className="form-submit-btn">
        {submitting ? "TRANSMITTING..." : "TRANSMIT MESSAGE"}
      </button>
    </form>
  );
}
