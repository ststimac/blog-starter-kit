---
layout: layouts/page.njk
title: Contact
description: Get in touch
permalink: /contact/
---

Want to collaborate or say hello? Fill out the form below.

<form name="contact" method="POST" data-netlify="true" class="contact-form">
  <input type="hidden" name="form-name" value="contact">
  <p>
    <label for="name">Name</label><br>
    <input type="text" id="name" name="name" required>
  </p>
  <p>
    <label for="email">Email</label><br>
    <input type="email" id="email" name="email" required>
  </p>
  <p>
    <label for="message">Message</label><br>
    <textarea id="message" name="message" rows="5" required></textarea>
  </p>
  <button type="submit">Send Message</button>
</form>
