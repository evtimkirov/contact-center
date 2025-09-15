<?php
namespace App\Http\Controllers\Api\V1;

use App\Models\Contact;
use Illuminate\Http\Request;

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
     * @param Request $request
     * @return mixed
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
        ]);

        return Contact::create($data);
    }

    /**
     * Update contact
     *
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function update(Request $request, $id)
    {
        $contact = Contact::findOrFail($id);

        $data = $request->validate([
            'name' => 'sometimes|required',
            'email' => 'sometimes|required|email',
        ]);

        $contact->update($data);

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
