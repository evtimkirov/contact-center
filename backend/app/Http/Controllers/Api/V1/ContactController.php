<?php
namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\StoreContactValidation;
use App\Http\Requests\UpdateContactValidation;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class ContactController
{
    /**
     * Get contacts
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $contacts = Cache::remember('contacts.all', 60, function () {
            return Contact::all();
        });

        return response()->json(['contacts' => $contacts]);
    }

    /**
     * Contact details with the interactions
     *
     * @param $id
     * @return JsonResponse
     */
    public function show($id): JsonResponse
    {
        $contact = Cache::remember("contacts.$id", 60, function () use ($id) {
            return Contact::with(['interactions' => function ($query) {
                $query->orderBy('id', 'desc');
            }])->findOrFail($id);
        });

        return response()->json($contact);
    }

    /**
     * Create a new contact
     *
     * @param StoreContactValidation $request
     * @return mixed
     */
    public function store(StoreContactValidation $request): mixed
    {
        $contact = Contact::create($request->all());

        Cache::forget('contacts.all');

        return $contact;
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

        Cache::forget('contacts.all');
        Cache::forget("contacts.$id");

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

        Cache::forget('contacts.all');
        Cache::forget("contacts.$id");

        return response()->noContent();
    }
}
