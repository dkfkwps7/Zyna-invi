import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  protected readonly title = signal('frontend');
  
  submitMessage: string = '';
  submitSuccess: boolean = false;
  private apiUrl = '/api/rsvps';

  constructor(private http: HttpClient) {}

  async submitRSVP(form: any) {
    try {
      const formData = {
        name: form.value.name,
        attending: form.value.attending
      };

      // Send RSVP to serverless API
      await this.http.post(this.apiUrl, formData).toPromise();

      this.submitMessage = 'Thank you for your RSVP!';
      this.submitSuccess = true;
      form.resetForm();

      // Clear message after 5 seconds with fade-out
      setTimeout(() => {
        const messageElement = document.querySelector('.submit-message');
        if (messageElement) {
          messageElement.classList.add('fade-out');
          setTimeout(() => {
            this.submitMessage = '';
          }, 400);
        } else {
          this.submitMessage = '';
        }
      }, 5000);

    } catch (error) {
      console.error('Error submitting RSVP:', error);
      this.submitMessage = 'Sorry, there was an error submitting your RSVP. Please try again.';
      this.submitSuccess = false;
      
      // Clear error message after 5 seconds with fade-out
      setTimeout(() => {
        const messageElement = document.querySelector('.submit-message');
        if (messageElement) {
          messageElement.classList.add('fade-out');
          setTimeout(() => {
            this.submitMessage = '';
          }, 400);
        } else {
          this.submitMessage = '';
        }
      }, 5000);
    }
  }
}
