<?php
namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\StoreContactValidation;
use App\Http\Requests\UpdateContactValidation;
use App\Models\Contact;

class ContactController
{
    /**
     * Get contacts
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function index()
    {
        return Contact::all();
    }

    /**
     * Contact details with the interactions
     *
     * @param $id
     * @return Contact|\Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|null
     */
    public function show($id)
    {
        return Contact::with('interactions')->findOrFail($id);
    }

    /**
     * Create a new contact
     *
     * @param StoreContactValidation $request
     * @return mixed
     */
    public function store(StoreContactValidation $request): mixed
    {
        return Contact::create($request->all());
    }

    /**
     * Update contact
     *
     * @param UpdateContactValidation $request
     * @param $id
     * @return mixed
     */
    public function update(UpdateContactValidation $request, $id): mixed
    {
        $contact = Contact::findOrFail($id);

        $contact->update($request->all());

        return $contact;
    }

    /**
     * Delete a contact with the related interations
     *
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return response()->noContent();
    }
}
