<?php

namespace Tests\Unit;

use App\Http\Controllers\Api\V1\ContactController;
use App\Models\Contact;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;
use App\Http\Requests\StoreContactValidation;
use App\Http\Requests\UpdateContactValidation;
use Mockery;

class ContactControllerTest extends TestCase
{
    /**
     * Contact controller
     *
     * @var ContactController
     */
    protected ContactController $controller;

    protected function setUp(): void
    {
        parent::setUp();

        $this->controller = new ContactController();
    }

    /**
     * Test get all contacts
     *
     * @return void
     */
    public function testGetAllContacts()
    {
        Contact::factory()->count(3)->create();

        Cache::shouldReceive('remember')
            ->once()
            ->andReturn(Contact::all());

        $response = $this->controller->index();

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertCount(3, $response->getData()->contacts);
    }

    /**
     * Test get single contact with interactions
     *
     * @return void
     */
    public function getSingleContact()
    {
        $contact = Contact::factory()->create();

        Cache::shouldReceive('remember')
            ->once()
            ->andReturn($contact);

        $response = $this->controller->show($contact->id);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals($contact->id, $response->getData()->id);
    }

    /**
     * Test the contact creation with the cache
     *
     * @return void
     */
    public function testCreateContact()
    {
        $payload = [
            'name'    => 'Unit Test Contact',
            'email'   => 'unit@example.com',
            'phone'   => '1234567890',
            'company' => 'Acme Inc',
        ];

        Cache::shouldReceive('forget')->once()->with('contacts.all');

        $mockRequest = Mockery::mock(StoreContactValidation::class);
        $mockRequest->shouldReceive('all')->andReturn($payload);

        $contact = $this->controller->store($mockRequest);

        $this->assertDatabaseHas('contacts', ['email' => 'unit@example.com']);
        $this->assertEquals('unit@example.com', $contact->email);
    }

    /**
     * Test to update a contact
     *
     * @return void
     */
    public function testUpdateContact()
    {
        $contact = Contact::factory()->create(['name' => 'Old Name']);

        Cache::shouldReceive('forget')->once()->with('contacts.all');
        Cache::shouldReceive('forget')->once()->with("contacts.{$contact->id}");

        $payload = ['name' => 'Updated Name'];

        $mockRequest = Mockery::mock(UpdateContactValidation::class);
        $mockRequest->shouldReceive('all')->andReturn($payload);

        $updated = $this->controller->update($mockRequest, $contact->id);

        $this->assertEquals('Updated Name', $updated->name);
    }

    /**
     * Test to delete a contact
     *
     * @return void
     */
    public function testDeleteContact()
    {
        $contact = Contact::factory()->create();

        Cache::shouldReceive('forget')->once()->with('contacts.all');
        Cache::shouldReceive('forget')->once()->with("contacts.{$contact->id}");

        $response = $this->controller->destroy($contact->id);

        $this->assertDatabaseMissing('contacts', ['id' => $contact->id]);
        $this->assertEquals(204, $response->getStatusCode());
    }
}
