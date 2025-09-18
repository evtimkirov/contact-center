<?php

namespace Tests\Feature;

use App\Models\Contact;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class ContactControllerTest extends TestCase
{
    /**
     * User
     *
     * @var User|\Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model
     */
    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }

    /**
     * Get contacts
     *
     * @return void
     */
    public function testGetContacts()
    {
        Contact::factory()->count(3)->create();

        $response = $this->actingAs($this->user)->getJson('/api/v1/contacts');

        $response->assertOk()
            ->assertJsonStructure([
                'contacts' => [['id', 'name', 'email', 'phone']]
            ]);
    }

    /**
     * Get contact with interactions
     *
     * @return void
     */
    public function testGetContactWithInteractions()
    {
        $contact = Contact::factory()
            ->hasInteractions(2)
            ->create();

        $response = $this->actingAs($this->user)->getJson("/api/v1/contacts/{$contact->id}");

        $response->assertOk()
            ->assertJsonFragment(['id' => $contact->id])
            ->assertJsonStructure(['id', 'name', 'interactions']);
    }

    /**
     * Test to add a new contact
     *
     * @return void
     */
    public function testCreateContact()
    {
        $email   = fake()->username . '@squaretalk.com';
        $payload = [
            'name'    => 'Test Contact',
            'email'   => $email,
            'phone'   => '1234567890',
            'company' => 'Acme Inc',
        ];

        $response = $this->actingAs($this->user)->postJson('/api/v1/contacts', $payload);

        $response
            ->assertStatus(201)
            ->assertJsonFragment(['email' => $email]);

        $this->assertDatabaseHas('contacts', ['email' => $email]);
        $this->assertFalse(Cache::has('contacts.all'));
    }

    /**
     * Test to update a contact
     *
     * @return void
     */
    public function testUpdateContact()
    {
        $contact = Contact::factory()->create([
            'name' => 'Old Name',
        ]);

        $payload = ['name' => 'New Name'];

        $response = $this->actingAs($this->user)->putJson("/api/v1/contacts/{$contact->id}", $payload);

        $response->assertOk()
            ->assertJsonFragment(['name' => 'New Name']);

        $this->assertDatabaseHas('contacts', ['name' => 'New Name']);
        $this->assertFalse(Cache::has("contacts.{$contact->id}"));
    }

    /**
     * Test to delete a contact
     *
     * @return void
     */
    public function testDeleteContact()
    {
        $contact = Contact::factory()->create();

        $response = $this->actingAs($this->user)->deleteJson("/api/v1/contacts/{$contact->id}");

        $response->assertNoContent();
        $this->assertDatabaseMissing('contacts', ['id' => $contact->id]);
        $this->assertFalse(Cache::has("contacts.{$contact->id}"));
    }

    /**
     * Test with non-exising contact
     *
     * @return void
     */
    public function testNonExistingContact()
    {
        $response = $this->actingAs($this->user)->getJson('/api/v1/contacts/9999');

        $response->assertNotFound();
    }
}
