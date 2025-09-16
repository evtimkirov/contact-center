<?php
namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\StoreContactValidation;
use App\Http\Requests\UpdateContactValidation;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class ContactController
{
    /**
     * Get contacts
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        return Response::json(['contacts' => Contact::all()]);
    }

    /**
     * Contact details with the interactions
     *
     * @param $id
     * @return Contact|\Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|null
     */
    public function show($id)
    {
        return Contact::with(['interactions' => function ($query) {
            $query->orderBy('id', 'desc');
        }])->findOrFail($id);
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
