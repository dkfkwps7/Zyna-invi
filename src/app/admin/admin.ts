import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent {
  guests: any[] = [];
  isLoading = false;
  private apiUrl = '/api/rsvps';
  private adminPassword = 'zyna2026'; // In production, use environment variables

  constructor(private http: HttpClient) {
    this.loadGuests();
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.adminPassword}`
    });
  }

  async loadGuests() {
    this.isLoading = true;
    try {
      const response = await this.http.get<any[]>(this.apiUrl).toPromise();
      this.guests = response || [];
    } catch (error) {
      console.error('Error loading guests:', error);
      this.guests = [];
    } finally {
      this.isLoading = false;
    }
  }

  exportToCSV() {
    if (this.guests.length === 0) {
      alert('No RSVPs to export');
      return;
    }

    const headers = ['Name', 'Attending', 'Timestamp'];
    const csvContent = [
      headers.join(','),
      ...this.guests.map((guest: any) => 
        `"${guest.name}","${guest.attending}","${guest.timestamp}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rsvps_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  async deleteGuest(guestId: string) {
    if (confirm('Are you sure you want to delete this RSVP?')) {
      try {
        await this.http.delete(`${this.apiUrl}?id=${guestId}`, {
          headers: this.getAuthHeaders()
        }).toPromise();
        // Reload the guest list after deletion
        await this.loadGuests();
      } catch (error) {
        console.error('Error deleting guest:', error);
        alert('Error deleting RSVP. Please try again.');
      }
    }
  }

  async clearAllGuests() {
    if (confirm('Are you sure you want to delete all RSVPs? This action cannot be undone.')) {
      try {
        // Delete each guest one by one
        const deletePromises = this.guests.map(guest => 
          this.http.delete(`${this.apiUrl}?id=${guest.id}`, {
            headers: this.getAuthHeaders()
          }).toPromise()
        );
        await Promise.all(deletePromises);
        
        // Reload the guest list
        await this.loadGuests();
      } catch (error) {
        console.error('Error clearing guests:', error);
        alert('Error clearing RSVPs. Please try again.');
      }
    }
  }

  getAttendingCount(): number {
    return this.guests.filter(g => g.attending === 'joyfully_accepts').length;
  }

  getDeclinedCount(): number {
    return this.guests.filter(g => g.attending === 'regretfully_declines').length;
  }

  formatDate(timestamp: string): string {
    return new Date(timestamp).toLocaleString();
  }
}
