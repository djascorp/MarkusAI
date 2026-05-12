<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            ...$this->profileRules(),
            'password' => $this->passwordRules(),
        ])->validate();

        $user = User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => $input['password'],
        ]);

        $this->createDefaultWorkspace($user);

        return $user;
    }

    private function createDefaultWorkspace(User $user): void
    {
        $workspace = Workspace::create([
            'name' => $user->name."'s Workspace",
            'slug' => Str::slug($user->name.'-'.Str::random(6)),
            'tone_of_voice' => 'professional yet accessible',
            'target_audience' => 'SaaS founders and indie hackers',
            'onboarding_completed' => false,
        ]);

        $user->workspaces()->attach($workspace, ['role' => 'owner']);

        $this->seedDefaultAgents($workspace);
    }

    private function seedDefaultAgents(Workspace $workspace): void
    {
        $agents = [
            ['type' => 'seo', 'name' => 'SEO Agent', 'description' => 'Technical & Content SEO Optimizer', 'icon' => 'search', 'status' => 'active'],
            ['type' => 'writer', 'name' => 'Writer Agent', 'description' => 'Long-form Content & Copy Generator', 'icon' => 'file-text', 'status' => 'active'],
            ['type' => 'reddit', 'name' => 'Reddit Agent', 'description' => 'Community Engagement & Monitoring', 'icon' => 'message-square', 'status' => 'idle'],
            ['type' => 'x', 'name' => 'X (Twitter) Agent', 'description' => 'Micro-blogging & Threads', 'icon' => 'share-2', 'status' => 'idle'],
            ['type' => 'linkedin', 'name' => 'LinkedIn Agent', 'description' => 'B2B Networking & Posts', 'icon' => 'linkedin', 'status' => 'idle'],
            ['type' => 'hn', 'name' => 'Hacker News Agent', 'description' => 'Tech Community Updates', 'icon' => 'share-2', 'status' => 'idle'],
        ];

        foreach ($agents as $agent) {
            $workspace->agents()->create($agent);
        }
    }
}
