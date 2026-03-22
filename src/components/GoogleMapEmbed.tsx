"use client";

export default function GoogleMapEmbed() {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30453.015607444468!2d78.51327847431642!3d17.429681499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9958a2aa1617%3A0x9e1bc939c9725836!2sPrashanthi%20Photo%20Studio!5e0!3m2!1sen!2sin!4v1774000969899!5m2!1sen!2sin"
      width="100%"
      height="250"
      style={{ border: 0, borderRadius: "12px" }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Prashanthi Studio Location"
    />
  );
}
