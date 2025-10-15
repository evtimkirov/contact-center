<?php
namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\StoreContactValidation;
use App\Http\Requests\UpdateContactValidation;
use App\Models\Contact;
use App\Services\ContactCacheService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redis;

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
     * @param ContactCacheService $cacheService
     * @return JsonResponse
     */
    public function show($id, ContactCacheService $cacheService): JsonResponse
    {
        return response()->json($cacheService->getContact($id));
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
