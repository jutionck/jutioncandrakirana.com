'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  const [settings, setSettings] = useState({
    // Site Settings
    siteName: 'Portfolio',
    siteDescription: 'A showcase of my work and skills as a web developer',
    siteUrl: 'https://yourportfolio.com',

    // Personal Information
    name: 'Your Name',
    title: 'Web Developer',
    email: 'your.email@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'A passionate web developer with expertise in modern web technologies. I love sharing knowledge and helping others learn through practical examples and tutorials.',

    // Social Links
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',

    // SEO Settings
    metaTitle: 'Portfolio - Web Developer',
    metaDescription:
      'Professional portfolio showcasing web development projects and skills',
    metaKeywords: 'web developer, portfolio, react, next.js, javascript',

    // Analytics
    googleAnalyticsId: '',
    enableAnalytics: false,

    // Email Settings
    contactEmail: 'your.email@example.com',
    enableContactForm: true,

    // Theme Settings
    primaryColor: '#3b82f6',
    enableDarkMode: true,
  });

  const handleSave = async () => {
    try {
      setIsSaving(true);

      // In a real app, this would be an API call to save settings
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: 'Settings saved',
        description: 'Your settings have been updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error saving settings',
        description: 'There was a problem saving your settings',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Settings</h1>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className='mr-2 h-4 w-4' />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Tabs defaultValue='general'>
          <TabsList className='mb-6'>
            <TabsTrigger value='general'>General</TabsTrigger>
            <TabsTrigger value='personal'>Personal</TabsTrigger>
            <TabsTrigger value='social'>Social</TabsTrigger>
            <TabsTrigger value='seo'>SEO</TabsTrigger>
            <TabsTrigger value='advanced'>Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value='general' className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle>Site Information</CardTitle>
                <CardDescription>
                  Basic information about your portfolio website
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid gap-4 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='siteName'>Site Name</Label>
                    <Input
                      id='siteName'
                      value={settings.siteName}
                      onChange={(e) =>
                        handleInputChange('siteName', e.target.value)
                      }
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='siteUrl'>Site URL</Label>
                    <Input
                      id='siteUrl'
                      value={settings.siteUrl}
                      onChange={(e) =>
                        handleInputChange('siteUrl', e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='siteDescription'>Site Description</Label>
                  <Textarea
                    id='siteDescription'
                    value={settings.siteDescription}
                    onChange={(e) =>
                      handleInputChange('siteDescription', e.target.value)
                    }
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>
                  Customize the appearance of your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid gap-4 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='primaryColor'>Primary Color</Label>
                    <div className='flex gap-2'>
                      <Input
                        id='primaryColor'
                        type='color'
                        value={settings.primaryColor}
                        onChange={(e) =>
                          handleInputChange('primaryColor', e.target.value)
                        }
                        className='w-20'
                      />
                      <Input
                        value={settings.primaryColor}
                        onChange={(e) =>
                          handleInputChange('primaryColor', e.target.value)
                        }
                        placeholder='#3b82f6'
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='enableDarkMode'>Dark Mode</Label>
                    <div className='flex items-center space-x-2 pt-2'>
                      <Switch
                        id='enableDarkMode'
                        checked={settings.enableDarkMode}
                        onCheckedChange={(checked) =>
                          handleInputChange('enableDarkMode', checked)
                        }
                      />
                      <Label
                        htmlFor='enableDarkMode'
                        className='cursor-pointer'
                      >
                        Enable dark mode toggle
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='personal' className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Information displayed on your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid gap-4 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='name'>Full Name</Label>
                    <Input
                      id='name'
                      value={settings.name}
                      onChange={(e) =>
                        handleInputChange('name', e.target.value)
                      }
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='title'>Professional Title</Label>
                    <Input
                      id='title'
                      value={settings.title}
                      onChange={(e) =>
                        handleInputChange('title', e.target.value)
                      }
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      type='email'
                      value={settings.email}
                      onChange={(e) =>
                        handleInputChange('email', e.target.value)
                      }
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='phone'>Phone</Label>
                    <Input
                      id='phone'
                      value={settings.phone}
                      onChange={(e) =>
                        handleInputChange('phone', e.target.value)
                      }
                    />
                  </div>

                  <div className='space-y-2 md:col-span-2'>
                    <Label htmlFor='location'>Location</Label>
                    <Input
                      id='location'
                      value={settings.location}
                      onChange={(e) =>
                        handleInputChange('location', e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='bio'>Bio</Label>
                  <Textarea
                    id='bio'
                    value={settings.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='social' className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle>Social Media Links</CardTitle>
                <CardDescription>
                  Links to your social media profiles
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid gap-4 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='github'>GitHub</Label>
                    <Input
                      id='github'
                      value={settings.github}
                      onChange={(e) =>
                        handleInputChange('github', e.target.value)
                      }
                      placeholder='https://github.com/username'
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='linkedin'>LinkedIn</Label>
                    <Input
                      id='linkedin'
                      value={settings.linkedin}
                      onChange={(e) =>
                        handleInputChange('linkedin', e.target.value)
                      }
                      placeholder='https://linkedin.com/in/username'
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='twitter'>Twitter</Label>
                    <Input
                      id='twitter'
                      value={settings.twitter}
                      onChange={(e) =>
                        handleInputChange('twitter', e.target.value)
                      }
                      placeholder='https://twitter.com/username'
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='instagram'>Instagram</Label>
                    <Input
                      id='instagram'
                      value={settings.instagram}
                      onChange={(e) =>
                        handleInputChange('instagram', e.target.value)
                      }
                      placeholder='https://instagram.com/username'
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='seo' className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>
                  Search engine optimization settings
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='metaTitle'>Meta Title</Label>
                  <Input
                    id='metaTitle'
                    value={settings.metaTitle}
                    onChange={(e) =>
                      handleInputChange('metaTitle', e.target.value)
                    }
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='metaDescription'>Meta Description</Label>
                  <Textarea
                    id='metaDescription'
                    value={settings.metaDescription}
                    onChange={(e) =>
                      handleInputChange('metaDescription', e.target.value)
                    }
                    rows={3}
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='metaKeywords'>Meta Keywords</Label>
                  <Input
                    id='metaKeywords'
                    value={settings.metaKeywords}
                    onChange={(e) =>
                      handleInputChange('metaKeywords', e.target.value)
                    }
                    placeholder='keyword1, keyword2, keyword3'
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='advanced' className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  Website analytics and tracking
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center space-x-2'>
                  <Switch
                    id='enableAnalytics'
                    checked={settings.enableAnalytics}
                    onCheckedChange={(checked) =>
                      handleInputChange('enableAnalytics', checked)
                    }
                  />
                  <Label htmlFor='enableAnalytics' className='cursor-pointer'>
                    Enable Google Analytics
                  </Label>
                </div>

                {settings.enableAnalytics && (
                  <div className='space-y-2'>
                    <Label htmlFor='googleAnalyticsId'>
                      Google Analytics ID
                    </Label>
                    <Input
                      id='googleAnalyticsId'
                      value={settings.googleAnalyticsId}
                      onChange={(e) =>
                        handleInputChange('googleAnalyticsId', e.target.value)
                      }
                      placeholder='G-XXXXXXXXXX'
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Form</CardTitle>
                <CardDescription>Contact form settings</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center space-x-2'>
                  <Switch
                    id='enableContactForm'
                    checked={settings.enableContactForm}
                    onCheckedChange={(checked) =>
                      handleInputChange('enableContactForm', checked)
                    }
                  />
                  <Label htmlFor='enableContactForm' className='cursor-pointer'>
                    Enable contact form
                  </Label>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='contactEmail'>Contact Email</Label>
                  <Input
                    id='contactEmail'
                    type='email'
                    value={settings.contactEmail}
                    onChange={(e) =>
                      handleInputChange('contactEmail', e.target.value)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible and destructive actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <Separator />
                  <div className='flex items-center justify-between'>
                    <div>
                      <h4 className='font-medium'>Reset all settings</h4>
                      <p className='text-sm text-muted-foreground'>
                        This will reset all settings to their default values
                      </p>
                    </div>
                    <Button variant='destructive' size='sm'>
                      <Trash2 className='mr-2 h-4 w-4' />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
