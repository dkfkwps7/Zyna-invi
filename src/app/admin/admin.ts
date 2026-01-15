import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  constructor() {
    this.loadGuests();
  }

  loadGuests() {
    this.isLoading = true;
    try {
      const storedGuests = JSON.parse(localStorage.getItem('rsvps') || '[]');
      this.guests = storedGuests.sort((a: any, b: any) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
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

  deleteGuest(index: number) {
    if (confirm('Are you sure you want to delete this RSVP?')) {
      this.guests.splice(index, 1);
      localStorage.setItem('rsvps', JSON.stringify(this.guests));
    }
  }

  clearAllGuests() {
    if (confirm('Are you sure you want to delete all RSVPs? This action cannot be undone.')) {
      this.guests = [];
      localStorage.setItem('rsvps', JSON.stringify(this.guests));
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
